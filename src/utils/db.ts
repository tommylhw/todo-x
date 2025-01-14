import { supabase } from '../lib/supabase';

const DBCreateUserData = async (auth_id: string, username: string, email: string, password: string) => {
  try {
    const { data, error } = await supabase
      .from('sys_user')
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
      .from('sys_user')
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
      .from('sys_user')
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
      .from('courses')
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

const DBFetchAsms = async (userId: any) => {
  try {
    const { data, error } = await supabase
      .from('view_asms')
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
  courseId: number,
  notification: boolean,
  due_date: string,
  due_time: string,
  note: string,
  status: string,
  userId: any,
) => {
  try {
    const { data, error } = await supabase
      .from('asm')
      .insert([{
        title: title,
        course_id: courseId,
        noti_on: notification,
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

const DBDeleteAsm = async (id: any) => {
  try {
    const { error } = await supabase
    .from('asm')
    .delete()
    .eq('id', id);

    if (error) {
      return error;
    } else {
      console.log("DELETED ASM: ", id);
    }
  } catch (error) {
    console.warn("Error on DeleteAsm:", error);
  }
}

const DBCreateTask = async (
  title: string,
  date: any,
  shiftIds: any,
  statusId: number,
  tagId: number,
  note: string,
  userId: any,
) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        title: title,
        date: date,
        shift_ids: shiftIds,
        status_id: statusId,
        tag_id: tagId,
        note: note,
        user_id: userId,
      }]);

    if (error) {
      return error;
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on CreateTask:", error);
  }
}

const DBFetchTasks = async (userId: any) => {
  try {
    const { data, error } = await supabase
      .from('view_tasks')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      return error;
    } else {
      return data;
    }
  } catch (error) {
    console.warn("Error on FetchTasks:", error);
  }
}

export {
  DBCreateUserData,
  DBFetchCourses,
  DBCreateAsm,
  DBFetchAsms,
  DBFetchUserData,
  DBFetchUserID,
  DBDeleteAsm,
  DBCreateTask,
  DBFetchTasks,
}