import { RiErrorWarningFill } from "react-icons/ri";

const gettingStarted = [
  "Begin training as soon as you bring your dog home",
  "Use positive reinforcement (treats, praise, play) rather than punishment",
  "Keep sessions short (5-15 minutes) and frequent",
  "Be consistent with commands and expectations",
  "Practice in different environments after mastering basics",
];

const patienceNote =
  "Patience is key in dog training. Dogs learn through repetition and positive associations. Never use physical punishment, as it can damage your bond and create fear.";

const essentialCommands = {
  sit: [
    "Hold a treat close to your dog's nose",
    "Move your hand up, allowing their head to follow and causing their bottom to lower",
    "Once sitting, say 'Sit', give the treat, and offer praise",
    "Repeat multiple times daily",
  ],
  stay: [
    "Ask your dog to 'Sit'",
    "Open your palm in front of you and say 'Stay'",
    "Take a few steps back, then return to your dog",
    "Reward with a treat and praise",
    "Gradually increase the distance and duration",
  ],
  come: [
    "Put your dog on a leash and say 'Come' while gently pulling",
    "When they come to you, reward with a treat and praise",
    "Practice off-leash in a secure area once reliable",
    "Never punish when they come to you, even if it took time",
  ],
};

const crateTraining = [
  "Introduce the crate gradually with treats and positive associations",
  "Feed meals near or in the crate to build positive connections",
  "Gradually increase the time your dog spends in the crate",
  "Never use the crate as punishment",
];

export const Training = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primaryBlack mb-6">
        Basic Training Tips
      </h2>
      <p className="text-lg text-primaryBlack/80 mb-6">
        Proper training is essential for a well-behaved and happy dog. These
        basic tips will help you get started with positive training methods.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Getting Started with Training
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {gettingStarted.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="bg-primaryBlue/20 border-l-4 border-primaryBlue p-4 rounded-r mb-6">
            <p className="text-sm text-primaryBlue flex italic items-start gap-3">
              <RiErrorWarningFill className="flex-shrink-0 relative top-1" />
              {patienceNote}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Essential Commands
          </h3>

          <div className="space-y-6">
            <div className="border border-black/20 p-4 rounded-lg">
              <h4 className="text-xl font-semibold text-primaryBlack/80 mb-3">
                Sit
              </h4>
              <ol className="list-decimal pl-6 space-y-2 text-primaryBlack/80">
                {essentialCommands.sit.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="border border-black/20 p-4 rounded-lg">
              <h4 className="text-xl font-semibold text-primaryBlack/80 mb-3">
                Stay
              </h4>
              <ol className="list-decimal pl-6 space-y-2 text-primaryBlack/80">
                {essentialCommands.stay.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="border border-black/20 p-4 rounded-lg">
              <h4 className="text-xl font-semibold text-primaryBlack/80 mb-3">
                Come
              </h4>
              <ol className="list-decimal pl-6 space-y-2 text-primaryBlack/80">
                {essentialCommands.come.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Crate Training
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Crate training provides your dog with a safe space and aids in
            housebreaking. To crate train effectively:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {crateTraining.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="text-primaryBlack/80">
            Remember that training is an ongoing process. Consistency, patience,
            and positive reinforcement will yield the best results. If you're
            struggling, consider working with a professional dog trainer.
          </p>
        </div>
      </div>
    </div>
  );
};
