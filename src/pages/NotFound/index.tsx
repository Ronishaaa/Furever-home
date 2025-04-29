import { Link } from "react-router-dom";
import { Button } from "../../components";

export const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-270px)] flex flex-col items-center justify-center bg-gradient-to-br from-primaryIvory to-secondaryWhite p-6">
      <h1 className="text-9xl font-bold text-primaryOrange mb-2">404</h1>
      <h2 className="text-3xl font-semibold text-primaryDarkRosewood mb-4">
        Page Not Found
      </h2>

      <p className="text-lg text-primaryDarkRosewood/80 mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/">
        <Button size="lg" variant="outlined-dark" label="Return to Home" />
      </Link>
    </div>
  );
};
