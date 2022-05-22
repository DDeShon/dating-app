import TinderCard from "react-tinder-card";
import axios from "axios";
import ChatContainer from "../components/ChatContainer";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.userId;
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    getGenderedUsers();
  }, [user, genderedUsers]);

  console.log(genderedUsers);

  // const characters = [
  //   {
  //     name: "Richard Hendricks",
  //     url: "https://i.imgur.com/oPj4A8u.jpg",
  //   },
  //   {
  //     name: "Erlich Bachman",
  //     url: "https://i.imgur.com/oPj4A8u.jpg",
  //   },
  //   {
  //     name: "Monica Hall",
  //     url: "https://i.imgur.com/oPj4A8u.jpg",
  //   },
  //   {
  //     name: "Jared Dunn",
  //     url: "https://i.imgur.com/oPj4A8u.jpg",
  //   },
  //   {
  //     name: "Dinesh Chugtai",
  //     url: "https://i.imgur.com/oPj4A8u.jpg",
  //   },
  //   {
  //     name: "Michael Scott",
  //     url: "https://lastfm.freetls.fastly.net/i/u/ar0/b1c3c53f4e754d80a1aa0d51bb96f7dc.jpg",
  //   },
  // ];

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  );

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.first_name}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                    className="card"
                  >
                    <h3>{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
