import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { PiWarningFill } from "react-icons/pi";

const goodHabits = [
  "Relaxed body posture",
  "Wagging tail (medium height)",
  "Soft, slightly open mouth",
  "Ears in natural position",
  "Play bow (front down, rear up)",
  "Rolling over for belly rubs",
];

const badHabits = [
  "Tense body posture",
  "Tail tucked between legs",
  "Ears flattened back",
  "Whites of eyes showing ('whale eye')",
  "Excessive panting or drooling",
  "Yawning when not tired",
];

const behaviorChallenges = [
  {
    title: "Separation Anxiety",
    signs:
      "Destructive behavior; excessive barking/howling; inappropriate elimination when left alone",
    solutions: [
      "Gradually build tolerance to your absence",
      "Create positive associations with departure cues",
      "Provide engaging toys and puzzles when alone",
      "Consider anti-anxiety products or prescription medication for severe cases",
    ],
  },
  {
    title: "Excessive Barking",
    signs: "Persistent barking in various situations",
    solutions: [
      "Identify and address the trigger (boredom, fear, territorial, attention-seeking)",
      "Teach 'quiet' command with positive reinforcement",
      "Provide adequate exercise and mental stimulation",
      "Avoid yelling, as dogs may interpret this as joining in",
    ],
  },
  {
    title: "Leash Reactivity",
    signs:
      "Lunging, barking, or growling at other dogs or people when on leash",
    solutions: [
      "Create distance from triggers until your dog can remain calm",
      "Use positive reinforcement when your dog sees triggers but remains calm",
      "Practice the 'Watch Me' command for redirection",
      "Consider a front-clip harness for better control",
      "Work with a professional trainer for severe cases",
    ],
  },
];

const enrichmentActivities = [
  "Rotate toys to maintain interest",
  "Use puzzle feeders and food-dispensing toys",
  "Practice obedience training and teach new tricks",
  "Set up scent games (hide treats for your dog to find)",
  "Provide supervised social time with other dogs",
];

export const Behavior = () => {
  return (
    <div className="prose max-w-none">
      <h2 className="text-5xl font-bold text-primaryBlack mb-6">
        Understanding Dog Behavior
      </h2>
      <p className="text-lg text-primaryBlack/80 mb-6">
        Understanding your dog's behavior is key to a harmonious relationship.
        Learn to read their body language and address common behavioral
        challenges.
      </p>

      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Reading Body Language
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Dogs communicate primarily through body language. Learning to
            interpret these signals helps you understand your dog's emotional
            state.
          </p>

          <div className="mb-4 grid gap-3 grid-cols-2">
            <div className="bg-primaryGreen/10 p-4 rounded-lg">
              <div className="text-base text-primaryGreen mb-1">
                {" "}
                Positive Behaviors
              </div>
              <ul className="space-y-3">
                {goodHabits.map((habit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-primaryBlack/70"
                  >
                    <FaCheck className="text-primaryGreen" />
                    {habit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-warningRed/10 p-4 rounded-lg">
              <div className="text-base text-warningRed mb-1">
                Stress Signals
              </div>
              <ul className="space-y-3">
                {badHabits.map((habit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-primaryBlack/70"
                  >
                    <FaXmark className="text-warningRed" />
                    {habit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-coral/20 border-l-4 border-primaryOrange p-4 rounded-r">
            <p className="text-sm text-primaryOrange flex italic items-start gap-3">
              <PiWarningFill className="flex-shrink-0 relative top-1" />
              If your dog shows multiple stress signals, remove them from the
              stressful situation. Never punish a dog for showing fear or
              anxiety, as this will only increase stress.
            </p>
          </div>
        </section>

        {/* Behavioral Challenges Section */}
        <section>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Common Behavioral Challenges
          </h3>

          {behaviorChallenges.map((challenge, index) => (
            <div
              key={index}
              className="border border-primaryBlack/20 p-4 rounded-lg mb-6"
            >
              <h4 className="text-xl font-semibold text-primaryBlack/80 mb-2">
                {challenge.title}
              </h4>
              <p className="text-primaryBlack/80 mb-2">
                <span className="font-medium">Signs:</span> {challenge.signs}
              </p>
              <h5 className="text-lg font-medium text-primaryBlack/80 mb-2">
                Solutions:
              </h5>
              <ul className="list-disc pl-6 space-y-1 text-primaryBlack/80">
                {challenge.solutions.map((solution, solIndex) => (
                  <li key={solIndex}>{solution}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Enrichment Section */}
        <section>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Enrichment & Mental Stimulation
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Mental stimulation is as important as physical exercise for
            preventing behavioral issues. Many behavioral issues stem from unmet
            physical or mental needs.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {enrichmentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
          <p className="text-primaryBlack/80">
            Ensuring your dog gets adequate exercise, mental stimulation, and
            positive social interactions can prevent many common problems. For
            persistent issues, consult with a certified dog trainer or
            behaviorist.
          </p>
        </section>
      </div>
    </div>
  );
};
