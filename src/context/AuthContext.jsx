import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

async function fetchUserProfile(uid) {
  if (!db) return null;
  const snapshot = await getDoc(doc(db, 'users', uid));
  return snapshot.exists() ? snapshot.data() : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return () => {};
    }

    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profileData = await fetchUserProfile(currentUser.uid);
        setProfile(profileData);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  const signUp = async ({ email, password, displayName, phone }) => {
    if (!auth || !db) {
      throw new Error('Firebase is not configured.');
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName?.trim()) {
      await updateFirebaseProfile(credential.user, { displayName: displayName.trim() });
    }

    const profileDoc = {
      uid: credential.user.uid,
      email,
      displayName: displayName?.trim() || '',
      phone: phone?.trim() || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      preferences: {
        reminderEnabled: true,
      },
    };

    await setDoc(doc(db, 'users', credential.user.uid), profileDoc, { merge: true });
    const latest = await fetchUserProfile(credential.user.uid);
    setProfile(latest);
    return credential.user;
  };

  const signIn = async ({ email, password }) => {
    if (!auth || !db) {
      throw new Error('Firebase is not configured.');
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    await setDoc(
      doc(db, 'users', credential.user.uid),
      {
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: credential.user.displayName || '',
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    const latest = await fetchUserProfile(credential.user.uid);
    setProfile(latest);
    return credential.user;
  };

  const signOut = async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
    setProfile(null);
  };

  const saveProfile = async (payload) => {
    if (!user || !db) {
      throw new Error('Please log in first.');
    }

    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,
        email: user.email,
        displayName: payload.displayName ?? user.displayName ?? '',
        phone: payload.phone ?? '',
        city: payload.city ?? '',
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    if (payload.displayName && payload.displayName !== user.displayName) {
      await updateFirebaseProfile(user, { displayName: payload.displayName });
    }

    const latest = await fetchUserProfile(user.uid);
    setProfile(latest);
    return latest;
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isFirebaseConfigured,
      signUp,
      signIn,
      signOut,
      saveProfile,
    }),
    [user, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
