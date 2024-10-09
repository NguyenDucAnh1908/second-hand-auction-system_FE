import StatusOrderSeller from "./StatusOrderSeller";
import OrderManagementSectionSeller from "./OrderManagementSectionSeller";
import { Tabs } from "react-tabs";
import React, {useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import Banner from '../../../partials/Banner';

export default function OrderManagementSeller() {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  
  return (


    <>

      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">


              {/* nội dung */}
              <div className="w-full ">
                <Tabs
                  className="mb-1 flex flex-col gap-12"
                  selectedTabClassName=""
                  selectedTabPanelClassName="tab-panel--selected"
                >

                  <StatusOrderSeller />
                  <OrderManagementSectionSeller />



                </Tabs>
              </div>
            </div>
          </main>
          <Banner />
        </div>
      </div>


    </>
  );
}



