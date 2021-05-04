const SideBarSticky = ({children}) => {
    return (
        <div className="flex-grow hidden lg:block">
        <div className="sticky top-10">
            {children}
        </div>
        </div>
    );
}

export default SideBarSticky;