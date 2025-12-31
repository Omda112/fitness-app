import { SelectPill } from './select-pill';

type Props = {
  goal: string;
  level: string;
  weight: string;
  setGoal: (v: string) => void;
  setLevel: (v: string) => void;
  setWeight: (v: string) => void;
};

export function GoalSelectors({
  goal,
  level,
  weight,
  setGoal,
  setLevel,
  setWeight,
}: Props) {
  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-6">
      <SelectPill
        title="Your Goal"
        value={goal}
        options={[
          'Lose Weight',
          'Build Muscle',
          'Maintain Fitness',
          'Improve Cardio',
        ]}
        onChange={setGoal}
      />

      <SelectPill
        title="Level"
        value={level}
        options={['Beginner', 'Intermediate', 'Advanced']}
        onChange={setLevel}
      />

      <SelectPill
        title="Weight"
        value={weight}
        options={['60 Kg', '70 Kg', '80 Kg', '90 Kg', '100 Kg']}
        onChange={setWeight}
      />
    </div>
  );
}
