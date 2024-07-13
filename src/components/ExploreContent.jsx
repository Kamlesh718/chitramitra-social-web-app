function ExploreContent({ imageUrl }) {
  return (
    <div className="w-full h-full aspect-square overflow-hidden ">
      <img
        src={imageUrl}
        alt="post"
        className="w-full h-32 sm:h-full object-cover cursor-pointer hover:scale-150 rounded-sm transition ease-in-out delay-100  "
      />
    </div>
  );
}

export default ExploreContent;
