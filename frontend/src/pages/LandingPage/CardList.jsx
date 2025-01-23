import Card from "./Card";

const CardList = () => {
  const cards = [
    {
      imageUrl: "https://i.pinimg.com/736x/2b/3d/ac/2b3dace1d07e7a09ed88ade68afdcc47.jpg",
      title: "Gymnasium",
    },
    {
      imageUrl: "https://i.pinimg.com/736x/55/82/cc/5582ccead0d63a1606e4b933b9d2de3a.jpg",
      title: "Pool",
    },
    {
      imageUrl: "https://i.pinimg.com/736x/d5/b4/a1/d5b4a16b6f3ee1b84495f14d52134488.jpg",
      title: "Ground",
    },
  ];

  return (
    <div className="flex justify-evenly gap-6 py-4 bg-gray-100">
      {cards.map((card, index) => (
        <Card key={index} imageUrl={card.imageUrl} title={card.title} />
      ))}
    </div>
  );
};

export default CardList;
