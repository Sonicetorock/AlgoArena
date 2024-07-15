import React, { useEffect, useRef } from 'react'
import ListOfProblems from './ListOfProblems'
import { useAuth } from '../../context/AuthContext'
import Typed from "typed.js";
const UserDashboardPage = () => {
  const {user} = useAuth();
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [user?.fullname],//, "Programmar"
      typeSpeed: 40,
      loop: false,
      loopCount: 3,
      showCursor:false,
      cursorChar: ">",
    });
    return () => {
      typed.destroy();
    };
  }, [])
  return (
    <>
    <div className='my-10'>
      <h1 className='text-2xl text-center font-extrabold font-mono'>
        Welcome <span ref={el} />!👋👋
      </h1>
    </div>
    <div >
      <ListOfProblems/>
    </div>
    </>
  )
}

export default UserDashboardPage
