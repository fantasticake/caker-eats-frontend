import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface IForm {
  key: string;
}

const Header = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = ({ key }) => {
    navigate(`/search/${key}`);
  };

  return (
    <div>
      <div className="shared-width mx-auto py-4 grid grid-cols-3">
        <div>
          <Link to={"/"} className="text-3xl w-min">
            <>
              <span className="font-medium mr-1">Caker</span>
              <span className="font-bold">Eats</span>
            </>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("key", { required: true })}
            className="transition duration-200 focus:shadow-md py-2 px-6 w-full bg-gray-200 rounded-full outline-none"
          />
        </form>
        <div className="flex items-center justify-end gap-4 text-xs font-medium">
          <Link to={"/login"} className="py-2 px-4  bg-gray-200 rounded-full">
            Log in
          </Link>
          <Link to={"/signup"} className="py-2 px-4  bg-gray-200 rounded-full">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;