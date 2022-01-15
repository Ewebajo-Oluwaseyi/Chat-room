import React, { Suspense, useState, useEffect } from 'react';
import { Home, Auth, CreateFeedback, Comments, EditComment } from "./Pages/index";
import "./assets/style/app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { User } from '@supabase/gotrue-js';
import { supabase } from './utils/supabase';
import SuspenseSpinner from './components/SuspenseSpinner';


function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user ?? null);

    const { data: authListener }= supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );
    setLoading(false);

    return () => {
      authListener?.unsubscribe()
    }
  }, [user]);

  if(loading) return null
  return (
    <Suspense fallback={<SuspenseSpinner/>}>
      <Router>
      <Switch>
        <Route path="/auth">
          <Auth/>
        </Route>
        <Route exact path="/create">
          {() => {
            return (
              <CreateFeedback/>
            )
          }}
        </Route>
        <Route exact path="/:id/edit">
          {({ location }) => {
            return (
              <EditComment feedback={location.state as App.Request}/>
            )
          }}
        </Route>
        <Route exact path="/:id">
          {() => {
            return (
              <Comments/>
            )
          }}
        </Route>
        <Route exact path="/">
          {() => {
            return (
              <Home/>
            )
          }}
        </Route>
      </Switch>
    </Router>
    </Suspense>
  );
}

export default App;


 {/*<div className="layout">
     <div className="layout-wrapper">
       <section>
       <div className="cards">
        <Sidebar/>
        <div className="cards_side">
          <Header/>
          <Content/>
          <footer>
      <p className="attribution">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          ><i className="fa fa-github" aria-hidden="true"/></a>.
         copyright &#169; Ewebajo Oluwaseyi 2021
  </p>
    </footer>
        </div>
       </div>
       </section>
     </div>
   </div>*/}