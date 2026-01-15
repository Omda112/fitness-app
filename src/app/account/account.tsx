'use client';

import * as React from 'react';
import { BackgroundBlobs } from './_components/background-blobs';
import { GoalSelectors } from './_components/goal-selectors';
import { SettingsTiles } from './_components/settings-tiles';

export default function AccountSettingsPage() {
  const [goal, setGoal] = React.useState('Lose Weight');
  const [level, setLevel] = React.useState('Beginner');
  const [weight, setWeight] = React.useState('90 Kg');

  return (
    <div className="min-h-screen bg-[#0b0b0c]">
      <BackgroundBlobs />

      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-14">
        <GoalSelectors
          goal={goal}
          level={level}
          weight={weight}
          setGoal={setGoal}
          setLevel={setLevel}
          setWeight={setWeight}
        />

        <div className="mt-14">
          <SettingsTiles />
        </div>
      </main>
    </div>
  );
}
