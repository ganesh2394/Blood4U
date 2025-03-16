const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      {/* Loader Animation */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Animated Loading Text */}
      <p className="text-xl font-bold text-gray-600 mt-4 animate-pulse">
        Hold on... We're getting things ready!
      </p>
    </div>
  );
};

export default LoadingScreen;
