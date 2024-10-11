import React, { useMemo } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronUpIcon,
  HomeIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  DocumentIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const nestedMenuItems = [
  { title: "Hero" },
  { title: "Features" },
  { title: "Testimonials" },
  { title: "Ecommerce" },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openNestedMenu, setOpenNestedMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Memoize the rendered items for performance
  const renderItems = useMemo(() => {
    return nestedMenuItems.map(({ title }, key) => (
      <a href="#" key={key}>
        <MenuItem>{title}</MenuItem>
      </a>
    ));
  }, [nestedMenuItems]);

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="h5"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 font-bold"
          >
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-bold text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Danh Mục
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:block">
          <Menu
            placement="right-start"
            allowHover
            offset={15}
            open={openNestedMenu}
            handler={setOpenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between">
              <MenuItem>
                Thời trang
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${isMenuOpen ? "rotate-90" : ""
                    }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="rounded-xl">{renderItems}</MenuList>
          </Menu>
          <MenuItem>Điện tử</MenuItem>
          <MenuItem>Xe</MenuItem>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <Menu
            placement="bottom"
            allowHover
            offset={6}
            open={openNestedMenu}
            handler={setOpenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between">
              <MenuItem>
                Figma
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${isMenuOpen ? "rotate-90" : ""
                    }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="block rounded-xl lg:hidden">
              {renderItems}
            </MenuList>
          </Menu>
          <MenuItem>React</MenuItem>
          <MenuItem>TailwindCSS</MenuItem>
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      {[
        { title: "Trang chủ", icon: <HomeIcon className="h-5 w-5 mr-2" /> },
        { title: "Sản phẩm", icon: <ShoppingCartIcon className="h-5 w-5 mr-2" /> },
        { title: "Liên hệ", icon: <PhoneIcon className="h-5 w-5 mr-2" /> },
        { title: "Bài viết", icon: <DocumentIcon className="h-5 w-5 mr-2" /> },
        { title: "Chính sách", icon: <InformationCircleIcon className="h-5 w-5 mr-2" /> },
      ].map((item, index) => (
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-medium"
          key={index}
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4 transition-transform duration-200 ease-in-out hover:bg-gray-300 hover:scale-105 hover:font-bold rounded-md"> {/* Added hover:bg-gray-300 */}
            <div className="flex items-center justify-center w-6 h-6"> {/* Optional: Centering icon */}
              {item.icon}

            </div>
            <span className="text-base">{item.title}</span> {/* Added span for better styling */}
          </ListItem>

        </Typography>
      ))}
    </List>
  );
}


function NavBarBK() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <Navbar className="w-full max-w-[1440px] px-5 py-2 bg-gradient-to-r from-gray-200 to-gray-300 bg-opacity-80 shadow-lg backdrop-blur-md rounded-md border border-gray-700">
      <div className="flex items-center justify-between text-white w-full">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-2 lg:ml-2 font-semibold text-xl"
        >
          <NavListMenu />
        </Typography>

        <div className="hidden lg:block">
          <NavList />
        </div>

        <IconButton
          variant="text"
          className="lg:hidden text-white hover:text-blue-200"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
    </Navbar>





  );
}

export default NavBarBK;
