import 'react-native-url-polyfill/auto';
import { supabase } from "../lib/supabase";
import { Session } from '@supabase/supabase-js';

import { DBCreateUserData, DBFetchUserID } from './db';


const AuthSignInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return error;
    } else {
      console.log("SIGN_IN_SUCCESS: ", data);
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn("Error on AuthSignInWithEmail:", error);
  }
}

const AuthSignUpWithEmail = async (email: string, password: string) => {
  try {
    const { data, error }: {data: any, error: any} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      return error;
    } else {
      console.log("SIGN_UP_SUCCESS: ", data);

      const userData: any = await DBCreateUserData(data.user.id, email, email, password);

      console.log("USER_DATA: ", JSON.parse(userData));

      // const action: any = await AuthSignInWithEmail(email, password);
      // console.log("SIGN_IN_DATA: ", action);
    }
  } catch (error) {
    console.warn("Error on AuthSignUpWithEmail:", error);
  }
}

const AuthGetCurrentUser = async () => {
  try {
    const session: any = await supabase.auth.getSession();

    const userIdFromDB = await DBFetchUserID(session.data.session.user.id);

    console.log("USER_ID_FROM_DB: ", userIdFromDB);

    return {
      ...session,
      userId: userIdFromDB
    };

  } catch (error) {
    console.warn("Error on AuthGetCurrentUser:", error);
  }
}

const AuthSignOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return error;
  } else {
    return 'SIGN_OUT_SUCCESS';
  }
}

const AuthConfirmAccount = async (email: string, token: string) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) {
      return error;
    } else {
      return 'CONFIRM_ACCOUNT_SUCCESS';
    }
  } catch (error) {
    console.warn("Error on AuthConfirmAccount:", error);
  }

}


export {
  AuthSignInWithEmail,
  AuthSignUpWithEmail,
  AuthGetCurrentUser,
  AuthSignOut,
  AuthConfirmAccount
}