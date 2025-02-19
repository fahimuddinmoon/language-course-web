

const Footer = () => {
    return (
        <footer className="footer footer-center bg-gray-700 text-white p-10 ">
            <aside>
                <img src="/public/image/favicon2.png.png" alt="" />
                <p className="font-bold">
                Real estate Platform .
                   
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
           
        </footer>
    );
};

export default Footer;