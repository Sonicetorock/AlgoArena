import React from 'react'

import CardBarChart from '../../components/CardBarChart'
import CardLineChart from '../../components/CardLineChart'
import CardPageVisits from '../../components/CardPageVisits'
import CardSocialTraffic from '../../components/CardSocialTraffic'
const AdminDashboardPage = () => {
  return (
    <>
    {/* <div>
      <h1>welcome to admindashboard</h1>
    </div> */}
    <div className="flex flex-wrap">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardLineChart />
      </div>
      <div className="w-full xl:w-4/12 px-4">
        <CardBarChart />
      </div>
    </div>
    <div className="flex flex-wrap mt-4">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardPageVisits />
      </div>
      <div className="w-full xl:w-4/12 px-4">
        <CardSocialTraffic />
      </div>
    </div>
  </>
  )
}

export default AdminDashboardPage
