import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import icon from "../assets/Images/icon.jpeg";
import profil from "../assets/Images/dummy.jpeg";
import { io } from "socket.io-client";
import useLoading from "../lib/Zustand/LoadingStore";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ userId }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const socketIo = io("http://localhost:5001", {
    query: { userId },
  });

  useEffect(() => {
    socketIo.emit("getNotif", { userId });

    socketIo.on("notif", (data) => {
      if (data.status === 200) {
        const successMessages = data.data.map((notif) => ({
          id: notif.id,
          message: notif.message || "Notifikasi diterima",
          status: notif.status,
        }));

        setNotifications(successMessages.reverse());
        setNotificationCount(successMessages.length);
      }
    });

    return () => {
      socketIo.disconnect();
    };
  }, [userId]);

  const handleNotificationItemClick = (id) => {
    socketIo.emit("getNotif", { notifId: id, status: true, userId });
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between max-w-md m md:max-w-3xl mx-auto">
        <div className="flex items-center space-x-4 ">
          <img src={icon} alt="Logo" className="w-8 h-8 rounded-full " />
        </div>
        <div className="flex items-center space-x-4 relative ">
          <div className="flex flex-row-reverse items-center gap-3">
            <div className="text-hijau-tua">
              <Link to={"/riwayat"}>
                <FaHistory />
              </Link>
            </div>
            <button
              className="text-hijau-tua dark:text-gray-300 relative"
              onClick={toggleModal} // Menambahkan event handler untuk toggle modal
            >
              <IoIosNotificationsOutline size={24} />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          {isModalOpen && ( // Menampilkan modal jika isModalOpen true
            <div
            className={`absolute top-full right-0 mt-2 w-48 lg:w-72 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-300 dark:border-gray-700 z-10 ${
              notificationCount < 1 ? "h-auto" : "max-h-[300px] overflow-auto"
            }`}
          >
              <div className="flex justify-between items-center px-4 py-2">
                <h1 className="text-xs font-bold">Pemberitahuan</h1>

                <button
                  className=""
                  onClick={toggleModal} // Menambahkan event handler untuk menutup modal
                >
                  ×
                </button>
              </div>
              <ul className="list-none p-2 -mt-4">
                {notifications.length === 0 ? (
                  <li className="p-2 text-gray-500 dark:text-gray-400 text-xs">
                    Belum ada notifikasi
                  </li>
                ) : (
                  notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-xs border-b-2"
                      onClick={() => handleNotificationItemClick(notif.id)}
                    >
                      {notif.message}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
          <div className="hidden md:block lg:block">
            <button className="text-gray-700 dark:text-gray-300 flex items-center space-x-2">
              <img
                src={profil}
                alt="Profile"
                className="w-10 h-10 rounded-full border p-1"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
