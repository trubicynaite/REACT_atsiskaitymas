import { Outlet } from "react-router";

const MainOutlet = () => {
    return (
        <>
            <header></header>
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </>
    );
}

export default MainOutlet;