import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
    Avatar,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
} from "@heroicons/react/24/outline";

export function SiderUserBK() {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                {/*<Typography variant="h5" color="blue-gray">*/}
                {/*    số dư:100000000*/}
                {/*</Typography>*/}
                <div className="flex items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>
                    <div>
                        <Typography variant="h6">Tania Andrew</Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Số dư:100000000
                        </Typography>
                    </div>
                </div>
                {/*<Typography variant="h5" color="blue-gray">*/}
                {/*    số dư:100000000*/}
                {/*</Typography>*/}
            </div>
            <List>
                <Accordion
                    open={open === 3}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                {/*<PresentationChartBarIcon className="h-5 w-5" />*/}
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Quản lý tài khoản
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Thông tin Tài khoản
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Danh sách yêu thích
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Quản lý địa chỉ
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Đơn hàng
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Analytics
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Lịch sử mua hàng
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Sản phẩm đã đấu giá
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Quản lý ví tiền
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Nạp tiền
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Lịch sử giao dịch
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <hr className="my-2 border-blue-gray-50" />
                <ListItem>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Inbox
                    <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix>
                </ListItem>
                {/*<ListItem>*/}
                {/*    <ListItemPrefix>*/}
                {/*        <UserCircleIcon className="h-5 w-5" />*/}
                {/*    </ListItemPrefix>*/}
                {/*    Profile*/}
                {/*</ListItem>*/}
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
            {/*<Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>*/}
            {/*    <CubeTransparentIcon className="mb-4 h-12 w-12" />*/}
            {/*    <Typography variant="h6" className="mb-1">*/}
            {/*        Upgrade to PRO*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="small" className="font-normal opacity-80">*/}
            {/*        Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features*/}
            {/*        and premium.*/}
            {/*    </Typography>*/}
            {/*    <div className="mt-4 flex gap-3">*/}
            {/*        <Typography*/}
            {/*            as="a"*/}
            {/*            href="#"*/}
            {/*            variant="small"*/}
            {/*            className="font-medium opacity-80"*/}
            {/*            onClick={() => setOpenAlert(false)}*/}
            {/*        >*/}
            {/*            Dismiss*/}
            {/*        </Typography>*/}
            {/*        <Typography as="a" href="#" variant="small" className="font-medium">*/}
            {/*            Upgrade Now*/}
            {/*        </Typography>*/}
            {/*    </div>*/}
            {/*</Alert>*/}
        </Card>
    );
}