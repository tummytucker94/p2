import React from 'react';

function About(){
    return(
       <div>
           <h1>About Pomodoro</h1>
           <p>
                The Pomodoro app is allows you to be productive in just 3 simple steps.
           </p>
           <div>
               <h2>1: Register</h2>
               <p>
                    The first step of your journey into the productiveness is to enter the required
                    information so that you pledge your allegiance to this productive pack.
               </p>
           </div>
           <div>
               <h2>2: Login</h2>
               <p>
                    The second step of your journey into productiveness is to enter your membership information
                    to verify that you are a member of this productive pack. All this step requires is your Email
                    and password. And your one step closer to being one with Flow.
               </p>
           </div>
           <div>
               <h2>3: Create A Session</h2>
               <p>
                   The last step of your journey into productiveness is for you to creat a pomodoro session define your overall session, the length
                   of your pomodoro, and the number of breaks that you want to take within the given period of time
                   and the timer will be set to fit your liking. After this step, the only step left is to complete your task in your created session.
               </p>
           </div>
       </div>
      );
  }
  
  export default About;