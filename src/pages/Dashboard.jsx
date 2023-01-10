import React, { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";
import Empty from "../components/Empty";
import { signOut } from "firebase/auth";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    
    useEffect(() => {
        if (!user) return navigate("/login");
      }, [user, loading]);

    let admin = (user && user.email.split("@")[0] === "admin") ? <ButtonFull name="Admin" callback={() => navigate("/admin")} /> : <Empty/>;

    return (
        <div className="home">
          <div className="container mt-4">
            <Group name="Torque Scout">
              <ButtonFull name="Scout" callback={() => navigate("/scout")} />
              <ButtonFull name="Analysis" callback={() => navigate("/analysis")} />
              <ButtonFull name="Sign Out" callback={() => signOut(auth)} />
              {admin}
            </Group>
          </div>
        </div>
      );
}

export default Dashboard;