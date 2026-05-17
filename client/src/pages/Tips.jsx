const Tips = () => {
  const tips = [
    {
      title: "Beginner",
      icon: "🟢",
      tips: [
        "Start with 3 days/week training",
        "Focus on form over weight",
        "Eat caloric surplus for muscle gain",
        "Get 7-8 hours of sleep",
        "Stay hydrated throughout day",
      ],
    },
    {
      title: "Intermediate",
      icon: "🟡",
      tips: [
        "Increase to 4-5 days/week",
        "Follow progressive overload",
        "Track macros (protein, carbs, fats)",
        "Add cardio 2-3 times weekly",
        "Incorporate mobility work",
      ],
    },
    {
      title: "Advanced",
      icon: "🔴",
      tips: [
        "Train 5-6 days/week with splits",
        "Use periodization techniques",
        "Optimize micronutrients",
        "Recovery techniques (massage, ice baths)",
        "Advanced supplements consultation",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          <span className="gradient-text">Fitness Tips & Guides</span>
        </h1>
        <p className="text-center text-gray-400 mb-16">Expert advice for your fitness level</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((level, idx) => (
            <div key={idx} className="card-dark">
              <div className="text-5xl mb-4">{level.icon}</div>
              <h3 className="text-2xl font-bold text-primary mb-6">{level.title}</h3>
              <ul className="space-y-4">
                {level.tips.map((tip, tipIdx) => (
                  <li key={tipIdx} className="text-gray-400 flex gap-3">
                    <span className="text-primary">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;
