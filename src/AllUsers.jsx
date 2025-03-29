import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import toast from "react-hot-toast";
import EditForm from "./EditForm";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  
  const handleEdit = (user) => {
    setEditUser(user);
    setIsOpenEditForm(true);
  };

  const handleUserUpdate = (updatedUser) => {
    console.log("Updated user data:", updatedUser);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editUser.id ? { ...user, ...updatedUser } : user
      )
    );
    setIsOpenEditForm(false); 
  };

  const closeForm = () => {
    setIsOpenEditForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success(`User ID ${id} deleted successfully!`);
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.error || "An error occurred"}`);
    }
  };

  const fetchUsers = async (pageNumber) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.error || "An error occurred"}`);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="min-h-screen w-full bg-gray-200 items-center p-4">
      {/* User Cards */}
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={user.id}
              firstName={user.first_name}
              lastName={user.last_name}
              avatar={user.avatar}
              onEdit={() => handleEdit(user)}
              onDelete={() => handleDelete(user.id)}
              
            />
          ))
        ) : (
          <p className="text-gray-500">Loading users...</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit Form */}
      {isOpenEditForm && (
        <div className="fixed inset-0 flex items-center justify-center lg:justify-end lg:mr-30 overflow-y-auto">
          <EditForm user={editUser} close={closeForm} onUpdateUser={handleUserUpdate} />
        </div>
      )}
    </div>
  );
}

export default AllUsers;
