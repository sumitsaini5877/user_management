import { Pencil, Trash, } from "lucide-react";
 
const UserCard = ({ firstName, lastName, avatar, onEdit, onDelete }) => {
  return (
    <div className="max-w-md mt-4 mx-auto bg-gray-300 shadow-lg rounded-2xl overflow-hidden p-4 flex items-center justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={avatar}
          alt={`${firstName} ${lastName}`}
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {firstName || "first name"} {lastName}
          </h2>
          <p className="text-gray-500">User</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          onClick={onEdit}
        >
          <Pencil size={18} />
        </button>
        <button
          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
          onClick={onDelete}
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
