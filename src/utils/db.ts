import { supabase } from '../lib/supabase';

const DBCreateUserData = async (auth_id: string, username: string, email: string, password: string) => {
  try {
    const { data, error } = await supabase
      .from('User')
      .insert([{
        auth_id: auth_id,
        username: username,
        email: email,
        password: password
      }]);

    if (error) {
      return error;
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on CreateUserData:", error);
  }
}

const DBFetchUserData = async (auth_id: string) => {
  try {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('auth_id', auth_id);

    if (error) {
      return error;
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on FetchUserData:", error);
  }
}

const DBFetchUserID = async (auth_id: string) => {
  try {
    const { data, error }: { data: any, error: any } = await supabase
      .from('User')
      .select('id')
      .eq('auth_id', auth_id);

    if (error) {
      return error;
    } else {
      // console.log("#############", data[0].id);
      return data[0].id;
    }
  } catch (error) {
    console.warn("Error on FetchUserID:", error);
  }

}

const DBFetchCourses = async () => {
  try {
    const { data, error } = await supabase
      .from('Courses')
      .select('*')
      .eq('enrolled_user', '22');

    if (error) {
      return error;
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on FetchCourses:", error);
  }
}

const DBFetchAsm = async (userId: any) => {
  try {
    const { data, error } = await supabase
      .from('Assignments')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      return error;
    } else {
      return data;
    }
  } catch (error) {
    console.warn("Error on FetchAsm:", error);
  }
}

const DBCreateAsm = async (
  title: string,
  course: string,
  notification: boolean,
  due_date: string,
  due_time: string,
  note: string,
  status: string,
  userId: any,
) => {
  try {
    const { data, error } = await supabase
      .from('Assignments')
      .insert([{
        title: title,
        course: course,
        notificationOn: notification,
        due_date: due_date,
        due_time: due_time,
        note: note,
        status: status,
        user_id: userId,
      }]);

    if (error) {
      return error;
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on CreateAsm:", error);
  }
}

export {
  DBCreateUserData,
  DBFetchCourses,
  DBCreateAsm,
  DBFetchAsm,
  DBFetchUserData,
  DBFetchUserID,
}