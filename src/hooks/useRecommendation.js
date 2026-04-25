import { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { getHaircareRecommendations } from '../services/geminiService';
import { useKeshCareStore } from '../store/useKeshCareStore';

export function useRecommendation() {
  const timerRef = useRef(null);
  const inFlightRef = useRef(false);
  const rateLimitUntilRef = useRef(0);
  const setLoading = useKeshCareStore((s) => s.setLoading);
  const setRecommendations = useKeshCareStore((s) => s.setRecommendations);
  const setError = useKeshCareStore((s) => s.setError);
  const addToHistory = useKeshCareStore((s) => s.addToHistory);

  const cooldownError = new Error('Gemini is temporarily rate limited. Please wait a minute and try again.');
  cooldownError.code = 'RATE_LIMIT';

  const generateRecommendation = useCallback((profile) => {
    const now = Date.now();
    if (rateLimitUntilRef.current > now) {
      return Promise.reject(cooldownError);
    }

    if (inFlightRef.current) {
      return Promise.reject(new Error('A recommendation request is already in progress.'));
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    return new Promise((resolve, reject) => {
      timerRef.current = setTimeout(async () => {
        try {
          inFlightRef.current = true;
          setLoading(true);
          const data = await getHaircareRecommendations(profile);
          setRecommendations(data);
          addToHistory({ profile, result: data });
          resolve(data);
        } catch (error) {
          if (error?.code === 'RATE_LIMIT' || error?.status === 429) {
            rateLimitUntilRef.current = Date.now() + 60_000;
          }

          const message =
            error?.code === 'RATE_LIMIT'
              ? error.message
              : error?.code === 'MODEL_NOT_FOUND'
                ? `${error.message} Update the model name in src/services/geminiService.js or check the Gemini API access for this project.`
              : error instanceof Error
                ? error.message
                : 'Failed to generate recommendations';
          setError(message);
          toast.error(message);
          reject(error);
        } finally {
          inFlightRef.current = false;
          setLoading(false);
        }
      }, 500);
    });
  }, [addToHistory, setError, setLoading, setRecommendations]);

  return { generateRecommendation };
}
