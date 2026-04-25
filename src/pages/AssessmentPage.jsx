import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Leaf, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import FormStepper from '../components/form/FormStepper';
import StepOne from '../components/form/StepOne';
import StepTwo from '../components/form/StepTwo';
import StepThree from '../components/form/StepThree';
import StepFour from '../components/form/StepFour';
import { assessmentSchema, stepValidators } from '../utils/validators';
import { useKeshCareStore } from '../store/useKeshCareStore';
import { useRecommendation } from '../hooks/useRecommendation';

const stepInfo = [
  { title: 'Hair Type', subtitle: 'Tell us about your hair structure' },
  { title: 'Scalp Condition', subtitle: 'Describe your scalp health' },
  { title: 'Hair Concerns', subtitle: 'Pick your top concerns' },
  { title: 'Lifestyle', subtitle: 'Help us tailor your plan' },
];

const stepVariants = {
  initial: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

function AssessmentPage() {
  const navigate = useNavigate();
  const {
    currentStep,
    totalSteps,
    formData,
    nextStep,
    prevStep,
    setStep,
    updateForm,
    isLoading,
  } = useKeshCareStore();
  const { generateRecommendation } = useRecommendation();

  const {
    watch,
    getValues,
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assessmentSchema),
    defaultValues: formData,
    mode: 'onChange',
  });

  const syncStore = () => {
    const latest = getValues();
    updateForm(latest);
    return latest;
  };

  const [direction, setDirection] = useState(1);

  const handleNext = async () => {
    const validator = stepValidators[currentStep];
    const latest = syncStore();
    const result = validator.safeParse(latest);
    if (!result.success) {
      Object.entries(result.error.flatten().fieldErrors).forEach(([key]) => trigger(key));
      toast.error('Please complete the required fields before continuing.');
      return;
    }
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    syncStore();
    setDirection(-1);
    prevStep();
  };

  const onSubmit = async (data) => {
    updateForm(data);
    try {
      await generateRecommendation(data);
      toast.success('Your personalized plan is ready!');
      navigate('/results');
    } catch {
      toast.error('Could not generate recommendations. Please try again.');
    }
  };

  const renderStep = () => {
    const props = { watch, setValue, errors };
    if (currentStep === 1) return <StepOne {...props} />;
    if (currentStep === 2) return <StepTwo {...props} />;
    if (currentStep === 3) return <StepThree {...props} />;
    return <StepFour watch={watch} setValue={setValue} register={register} errors={errors} />;
  };

  const info = stepInfo[currentStep - 1];
  const progress = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-gradient-to-b from-[var(--color-bg-alt)] to-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)]">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            Hair Profile Assessment
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Complete 4 steps to get your personalized Ayurvedic plan
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[var(--radius-2xl)] bg-white shadow-[var(--shadow-lg)] overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-[var(--color-border)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-soft)]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* Step header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-faint)]">
                  Step {currentStep} of {totalSteps}
                </p>
                <h2 className="mt-0.5 text-xl font-bold text-[var(--color-text)]">{info.title}</h2>
                <p className="text-sm text-[var(--color-text-muted)]">{info.subtitle}</p>
              </div>
              <FormStepper
                currentStep={currentStep}
                totalSteps={totalSteps}
                onStepClick={(step) => { syncStore(); setStep(step); }}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
                <Button
                  variant="secondary"
                  onClick={handlePrev}
                  disabled={currentStep === 1 || isLoading}
                  size="md"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} size="md" disabled={isLoading}>
                    Next Step
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                    size="md"
                  >
                    {isLoading ? (
                      'Analyzing your profile…'
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate My Plan
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Trust note */}
        <p className="mt-6 text-center text-xs text-[var(--color-text-faint)]">
          Your data stays on your device  we never store or share personal information.
        </p>
      </div>
    </div>
  );
}

export default AssessmentPage;
