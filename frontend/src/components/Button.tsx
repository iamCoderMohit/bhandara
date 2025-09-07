import Spinner from "./Spinner";

interface buttonProps{
    handler: () => void,
    loading: boolean,
    text: string
}

function Button({handler, loading, text}: buttonProps) {
  return (
    <div>
      <button
        className="bg-orange-700 w-full rounded-md py-2 cursor-pointer flex justify-center items-center gap-5"
        onClick={handler}
      >
        <span
          className={`transition-all duration-300 ${
            loading ? "translate-x-[-10px]" : "translate-x-0"
          }`}
        >
          {text}
        </span>
        {loading ? <Spinner /> : null}
      </button>
    </div>
  );
}

export default Button;
