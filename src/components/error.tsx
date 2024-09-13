type props = {
  message: string;
  dismissError: VoidFunction;
};

function Error({ message, dismissError }: props) {
  return (
    <div
      onClick={dismissError}
      className="min-w-96 bg-red-500 text-white text-center text-lg p-2 fixed left-1/2 -translate-x-1/2 selecr- top-4 cursor-pointer select-none"
    >
      <p>{message}</p>
    </div>
  );
}

export default Error;
