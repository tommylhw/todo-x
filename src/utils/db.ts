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
      console.warn(error);
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
      console.warn(error);
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
      console.warn(error);
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
      .eq('user_id', '22');

    if (error) {
      console.warn(error);
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
      console.warn(error);
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
      console.warn(error);
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
      console.warn(error);
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
      console.warn(error);
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
      console.warn(error);
    } else {
      return data;
    }
  } catch (error) {
    console.warn("Error on FetchTasks:", error);
  }
}

const DBFetchTagsByUserId = async (userId: any) => {
  try {
    const { data, error } = await supabase
      .from('tag')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 0);

    if (error) {
      console.warn(error);
    } else {
      return data;
    }
  } catch (error) {
    console.warn("Error on FetchTagsByUserId:", error);
  }
}

const DBDeleteTag = async (tagId: number) => {
  try {
    const { error } = await supabase
      .from('tag')
      .delete()
      .eq('id', tagId);

    if (error) {
      console.warn(error);
    } else {
      return "SUCCESS";
      console.log("DELETED TAG: ", tagId);
    }
  } catch (error) {
    console.warn("Error on DeleteTag:", error);
  }
}

const DBCreateTag = async (title: string, tag_type: string, colorCode: string, userId: any) => {
  try {
    const { data, error } = await supabase
      .from('tag')
      .insert([{
        title: title,
        tag_type: tag_type,
        color_code: colorCode,
        user_id: userId,
      }]);

    if (error) {
      console.warn(error);
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on CreateTag:", error);
  }
}

const DBUpdateTag = async (tagId: number, title: string, colorCode: string) => {
  try {
    const { data, error } = await supabase
      .from('tag')
      .update({
        title: title,
        color_code: colorCode,
      })
      .eq('id', tagId);

    if (error) {
      console.warn(error);
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on UpdateTag:", error);
  }
}

const DBCreateDeadline = async (
  title: string,
  tagIds: [],
  dueDatetime: any,
  note: string,
  notiOn: boolean,
  userId: any,
) => {
  try {
    const { data, error } = await supabase
      .from('deadline')
      .insert([{
        title: title,
        tag_ids: tagIds,
        due_datetime: dueDatetime,
        note: note,
        noti_on: notiOn,
        user_id: userId,
      }]);

    if (error) {
      console.warn(error);
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on CreateDeadline:", error);
  }
}

const DBFetchDeadline = async (userId: any) => {
  try {
    const { data, error } = await supabase
      .from('deadline')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.warn(error);
    } else {
      return data;
    }
  } catch (error) {
    console.warn("Error on FetchDeadline:", error);
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
  DBFetchTagsByUserId,
  DBDeleteTag,
  DBCreateTag,
  DBUpdateTag,
  DBCreateDeadline,
  DBFetchDeadline,
}