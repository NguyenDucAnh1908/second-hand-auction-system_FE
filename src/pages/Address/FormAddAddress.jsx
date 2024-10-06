import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Option,
    Select,
    Textarea,
} from "@material-tailwind/react";

export function FormAddAddress() {
    return (
        <div className="flex justify-center items-baseline min-h-screen">
            <Card color="transparent" shadow={false}>
                <form className="mt-7 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Title
                        </Typography>
                        <div className="max-w-lg">
                            <Input label="Title"/>
                        </div>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Province
                        </Typography>
                        {/*<div className="w-72">*/}
                        {/*    <Select label="Select Province">*/}
                        {/*        <Option>Material Tailwind HTML</Option>*/}
                        {/*        <Option>Material Tailwind React</Option>*/}
                        {/*        <Option>Material Tailwind Vue</Option>*/}
                        {/*        <Option>Material Tailwind Angular</Option>*/}
                        {/*        <Option>Material Tailwind Svelte</Option>*/}
                        {/*    </Select>*/}
                        {/*</div>*/}
                        <Select size="lg" label="Select Province">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            District
                        </Typography>
                        <Select size="lg" label="Select District">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Ward
                        </Typography>
                        <Select size="lg" label="Select Ward">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Number Home
                        </Typography>
                        <div  className="max-w-lg">
                            <Textarea label="Number Home"/>
                        </div>
                    </div>
                    {/*<Checkbox*/}
                    {/*    label={*/}
                    {/*        <Typography*/}
                    {/*            variant="small"*/}
                    {/*            color="gray"*/}
                    {/*            className="flex items-center font-normal"*/}
                    {/*        >*/}
                    {/*            I agree the*/}
                    {/*            <a*/}
                    {/*                href="#"*/}
                    {/*                className="font-medium transition-colors hover:text-gray-900"*/}
                    {/*            >*/}
                    {/*                &nbsp;Terms and Conditions*/}
                    {/*            </a>*/}
                    {/*        </Typography>*/}
                    {/*    }*/}
                    {/*    containerProps={{className: "-ml-2.5"}}*/}
                    {/*/>*/}
                    {/*<Button className="mt-6" fullWidth>*/}
                    {/*    Add*/}
                    {/*</Button>*/}
                    {/*<Typography color="gray" className="mt-4 text-center font-normal">*/}
                    {/*    Already have an account?{" "}*/}
                    {/*    <a href="#" className="font-medium text-gray-900">*/}
                    {/*        Sign In*/}
                    {/*    </a>*/}
                    {/*</Typography>*/}
                </form>
            </Card>
        </div>
            );
            }