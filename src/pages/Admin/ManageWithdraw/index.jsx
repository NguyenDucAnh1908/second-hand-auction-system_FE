import React, { useState } from 'react';
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { Col, Divider, Drawer, List, Row } from 'antd';

import Pagination from "@/components/Pagination/index.jsx";

const TABLE_HEAD = ["Name", "Amount", "Date", "Status", "Account","Reason", "Detail",""];

const TABLE_ROWS = [
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
        name: "Spotify",
        amount: "$2,500",
        date: "Wed 3:00pm",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
        expiry: "06/2026",
        reason: 'Product Return roduct Return roduct Return roduct Return'
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
        name: "Amazon",
        amount: "$5,000",
        date: "Wed 1:00pm",
        status: "paid",
        account: "master-card",
        accountNumber: "1234",
        expiry: "06/2026",
        reason: 'Product Return'
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
        name: "Pinterest",
        amount: "$3,400",
        date: "Mon 7:40pm",
        status: "pending",
        account: "master-card",
        accountNumber: "1234",
        expiry: "06/2026",
        reason: 'Product Return'
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
        name: "Google",
        amount: "$1,000",
        date: "Wed 5:00pm",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
        expiry: "06/2026",
        reason: 'Product Return'
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
        name: "netflix",
        amount: "$14,000",
        date: "Wed 3:30am",
        status: "cancelled",
        account: "visa",
        accountNumber: "1234",
        expiry: "06/2026",
        reason: 'Product Return'
    },
];

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

const ManagementWithdrawOfSeller = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className="container mx-auto py-10">
            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
                <p
                    className="site-description-item-profile-p"
                    style={{
                        marginBottom: 24,
                    }}
                >
                    User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Full Name" content="Lily" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Account" content="AntDesign@example.com" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="City" content="HangZhou" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Country" content="China🇨🇳" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Birthday" content="February 2,1900" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Website" content="-" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Message"
                            content="Make things as simple as possible but no simpler."
                        />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Company</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Position" content="Programmer" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Responsibilities" content="Coding" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Department" content="XTech" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Skills"
                            content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                        />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Contacts</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Email" content="AntDesign@example.com" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Github"
                            content={
                                <a href="http://github.com/ant-design/ant-design/">
                                    github.com/ant-design/ant-design/
                                </a>
                            }
                        />
                    </Col>
                </Row>
            </Drawer>
            <h1 className="text-3xl font-bold text-center mb-8">Withdrawal Requests Management</h1>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Recent Transactions
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                These are details about the last transactions
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                                />
                            </div>
                            <Button className="flex items-center gap-3" size="sm">
                                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4"/> Download
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {TABLE_ROWS.map(
                            (
                                {
                                    img,
                                    name,
                                    amount,
                                    date,
                                    status,
                                    account,
                                    accountNumber,
                                    reason,
                                    // expiry,
                                },
                                index,
                            ) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={img}
                                                    alt={name}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {amount}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={status}
                                                    color={
                                                        status === "paid"
                                                            ? "green"
                                                            : status === "pending"
                                                                ? "amber"
                                                                : "red"
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                                    <Avatar
                                                        src={
                                                            account === "visa"
                                                                ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                                                : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                                        }
                                                        size="sm"
                                                        alt={account}
                                                        variant="square"
                                                        className="h-full w-full object-contain p-1"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal capitalize"
                                                    >
                                                        {account.split("-").join(" ")}
                                                        {/*{accountNumber}*/}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {accountNumber}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal truncate"
                                                style={{
                                                    maxWidth: '110px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {reason}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            {/*<Tooltip content="Edit User">*/}
                                            {/*    <IconButton variant="text">*/}
                                            {/*    <PencilIcon className="h-4 w-4"/>*/}
                                            {/*    </IconButton>*/}
                                            {/*</Tooltip>*/}
                                            <div className="flex items-center gap-2">
                                                <Button color="blue" onClick={showDrawer}>Detail</Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        </tbody>
                    </table>
                </CardBody>
                <div className="flex justify-center items-center mt-4">
                    <Pagination/>
                </div>
            </Card>
        </div>
    );
};

export default ManagementWithdrawOfSeller;
