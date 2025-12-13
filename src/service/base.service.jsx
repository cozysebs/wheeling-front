import useUserStore from "../store/useUserStore"

const authHeader = () => {
  const currentUser = useUserStore.getState().user;
  const headers = {
    'Content-Type': 'application/json',
  };

  if (currentUser?.token) {
    headers.authorization = `Bearer ${currentUser.token}`;
  }

  return headers;
};

export {authHeader};