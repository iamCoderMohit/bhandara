interface postProps {
  imageUrl?: string;
  showBottom: boolean;
}

function Post({ imageUrl, showBottom }: postProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={` bg-red-200 ${showBottom ? "w-[60%] h-100" : "w-40"}`}
      >
        {imageUrl && (
          <div>
            <img src="" alt="" />
          </div>
        )}
      </div>

      {/* bottom section is dynamic */}
      {showBottom && <div></div>}
    </div>
  );
}

export default Post;
