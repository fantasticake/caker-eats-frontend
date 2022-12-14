import { gql } from "@apollo/client";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { useSeeRestaurantLazyQuery } from "../generated/graphql";
import useMe from "../hooks/useMe";

gql`
  query SeeRestaurant($input: SeeRestaurantInput!) {
    seeRestaurant(input: $input) {
      ok
      error
      result {
        id
        name
        imageUrl
        menu {
          id
          name
          description
          imageUrl
          price
          options {
            name
            extra
          }
        }
      }
    }
  }
`;

const MyRestaurant = () => {
  const [seeRestaurantQuery, { data, loading }] = useSeeRestaurantLazyQuery();
  const { loading: meLoading } = useMe({
    onCompleted: ({ seeMe: { result } }) => {
      if (result?.restaurantId)
        seeRestaurantQuery({
          variables: {
            input: { restaurantId: result.restaurantId },
          },
        });
    },
  });

  return (
    <div>
      <Header />
      {loading || meLoading ? (
        <Loading />
      ) : (
        <div>
          <img
            className=" w-full h-72 object-cover"
            src={data?.seeRestaurant.result?.imageUrl || ""}
            alt=""
          />
          <div className="flex flex-col items-center">
            <div className=" shared-width">
              <h1 className="mt-4 mr-8 text-3xl font-bold">
                {data?.seeRestaurant.result?.name}
              </h1>

              <div className="py-16 grid grid-cols-4 gap-6">
                {data?.seeRestaurant.result?.menu.map(dish => (
                  <div
                    key={dish.id}
                    className="  p-2 hover:scale-105 hover:shadow-2xl transition duration-500"
                  >
                    <img
                      className=" rounded-sm w-full h-48 object-cover"
                      src={dish.imageUrl || ""}
                      alt=""
                    />
                    <div className="mt-1 flex justify-between items-center">
                      <h2 className="font-medium">{dish.name}</h2>
                    </div>
                    <h3 className=" text-sm">${dish.price}</h3>
                    <div>
                      <h3 className="font-medium mt-2">options</h3>
                      {dish.options?.map((option, index) => (
                        <div key={index} className="flex justify-between">
                          <div className="flex gap-1 text-sm">
                            <h4>+${option.extra || 0}</h4>
                            <h4>{option.name}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyRestaurant;
