import { useState, useEffect, useRef } from 'react';

const RESEND_COOLDOWN = 30; // 30 seconds
const STORAGE_KEY = 'otp_resend_timer_end';

export function useResendTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [canResend, setCanResend] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate remaining time based on end timestamp
  const calculateTimeLeft = (endTime: number) => {
    const now = Date.now();
    const remaining = Math.ceil((endTime - now) / 1000);
    return Math.max(0, remaining);
  };

  // Clear any existing interval
  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start the countdown
  const startTimer = (endTime: number) => {
    clearTimer();

    const updateTimer = () => {
      const remaining = calculateTimeLeft(endTime);

      if (remaining <= 0) {
        // Timer finished
        setTimeLeft(0);
        setCanResend(true);
        localStorage.removeItem(STORAGE_KEY);
        clearTimer();
      } else {
        setTimeLeft(remaining);
        setCanResend(false);
      }
    };

    // Update immediatly
    updateTimer();

    // Then update every second
    intervalRef.current = setInterval(updateTimer, 1000);
  };

  // Initialize timer on mount (check for existing timer)
  useEffect(() => {
    const storedEndTime = localStorage.getItem(STORAGE_KEY);
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const remaining = calculateTimeLeft(endTime);

      if (remaining > 0) {
        // Timer still active, resume it
        startTimer(endTime);
      } else {
        // Timer expired, clean up
        localStorage.removeItem(STORAGE_KEY);
        setCanResend(true);
      }
    }

    // Cleanup on unmount
    return () => clearTimer();
  }, []);

  // Function to trigger resend (call this when button is clicked)
  const triggerResend = () => {
    if (!canResend) return; // Prevent multiple clicks

    // Calculate end time (current time + 30 seconds)
    const endTime = Date.now() + RESEND_COOLDOWN * 1000;

    // Store end time in localStorage
    localStorage.setItem(STORAGE_KEY, endTime.toString());

    // Start the countdown
    startTimer(endTime);
  };

  return {
    timeLeft,
    canResend,
    triggerResend,
  };
}

// Helper function to check if timer is active (can be used outside the hook)
export function hasActiveTimer(): boolean {
  const storedEndTime = localStorage.getItem(STORAGE_KEY);

  if (!storedEndTime) return false;

  const endTime = parseInt(storedEndTime, 10);
  const now = Date.now();
  const remaining = Math.ceil((endTime - now) / 1000);

  return remaining > 0;
}
