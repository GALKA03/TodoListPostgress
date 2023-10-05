import { type } from "os";

// import { TaskProps } from "@/components/TodoList";
interface TaskPayload {
  title: string;
  text: string;
  status: "inProgress";
}


type RegistrationResponse = {
  user?: {
    user_id: string;
    user_name: string;
    user_email: string;
  };
  message?: string;
};
interface TaskResponse {
  title: string;
  text: string;
  id: string;
  status: "inProgress" | "done"; 
} 

const BASE_URL = 'https://task-list-server-5fsl.onrender.com';


export const getAllTasks = async () => {
    try {
       let res = await fetch(`${BASE_URL}/tasks/`, { cache: 'force-cache' });
    
        console.log(res.body)
        if (!res.ok) {
        throw new Error('failed to fetch data')
    }
      return res.json()
    } catch (error) { console.log(error)}
}



export const addNewTask = async (title: string, text: string): Promise<TaskResponse> => {
  // Prepare the payload
  const payload: TaskPayload = {
    title,
    text,
    status: "inProgress"
  };

  // console.log("Sending payload:", payload);

  try {
    // Make the fetch request
    const response = await fetch(`${BASE_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    //    credentials: 'include'
    });
console.log('fetch response',response)
    // Check the response
    if (!response.ok) {
  const errorData = await response.text();  // Get the response text (or use .json() if it's a JSON response)
  console.error('Backend Error:', errorData);
  throw new Error(`${response.statusText}: ${errorData}`);
}

    const responseData: TaskResponse = await response.json();

    console.log('responseData', responseData);
    return responseData;

  } catch (error) {
     const e = error as Error;
    console.error("Error while deleting the task:", e.message);
    throw e;
  }
};


export const deleteTask = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
    console.error('Backend Error:', errorData);
      throw new Error(errorData.error || "Failed to delete task");
    }

     console.log('Task deleted successfully');
    
  } catch (error) {
    const e = error as Error;
    console.error("Error while deleting the task:", e.message);
    throw e;
  }
};

export const updateNewTask = async (taskId: string, newTitle: string, newText: string) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
        text: newText,
      })
    });

    if (!response.ok) {
      throw new Error(`Bad Request: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error while updating the task');
    throw error;
  }
}

// auth fetch*************************


export const fetchRegister = async (user_name: string, user_email: string, user_password: string): Promise<RegistrationResponse> => {
  // Prepare the payload
  const payload = {
    user_name,
    user_email,
    user_password
  };
  console.log("Sending register payload:", payload);


  try {
    // Make the fetch request
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    console.log('fetch response register', response);

    // Check the response
    if (!response.ok) {
      const errorData = await response.text();  // Modified this to get the error message
      console.error('Backend Error:', errorData);
      throw new Error(`${response.statusText}: ${errorData}`);
    }

    const responseData: RegistrationResponse = await response.json();

    console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('Error while creating user');
    throw error;
  }
}

type LoginResponse = {
  token: string;
  user_email: string;
  hashed_password?: string; // I'm including this based on your provided structure, but you should consider not returning a hashed password for security reasons.
};

export async function fetchLogin(user_email: string, user_password: string): Promise<LoginResponse> {
  const payload = {
    user_email,
    user_password,
  };

  console.log("Sending payload login:", payload);

  try {
    const response = await fetch(`https://task-list-server-5fsl.onrender.com/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: 'include' // If you're using cookies for token storage, keep this line
    });

    console.log('fetch response login', response);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Backend Error:', errorData);
      throw new Error(`${response.statusText}: ${errorData}`);
    }

    const responseData: LoginResponse = await response.json();

    if (responseData.token) {
      localStorage.setItem('jwtToken', responseData.token);
    }

    console.log('responseData', responseData);
    return responseData;

  } catch (error) {
    console.error('Error while logging in user');
    throw error;
  }
}

export const logoutFetch = async() => {
  try {
    const token = localStorage.getItem('jwtToken'); // Assuming you store the token in local storage

    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch(`${BASE_URL}/auth/logout`  , {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
      localStorage.removeItem('jwtToken'); // Remove token from local storage
    } else {
      console.error(data.error);
    }

  } catch (error) {
    console.error('Logout failed:', error);
  }
}