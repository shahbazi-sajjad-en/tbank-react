
"use client"
import { Grid } from "@mui/system";
import CardStatsVertical from "src/@core/components/card-statistics/card-stats-vertical";
import CrmSalesWithAreaChart from "src/views/dashboards/crm/CrmSalesWithAreaChart";
import CrmSessions from "src/views/dashboards/crm/CrmSessions";

export default function Home() {

  const data={}
  const role = data?.user?.roles
  return (
    < >
      <div className="mb-8 text-xl font-bold">
        {data?.user?.name} عزیز,

        خوش آمدید.
      </div>
      {role?.includes("ROLE_TBANK_USER") && <div className="grid grid-cols-2  md:grid-cols-4 gap-4">
        <Grid item xs={6} sm={4} lg={2}>
          <CrmSalesWithAreaChart />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <CrmSessions />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <CardStatsVertical
            stats='1.28k'
            chipText='-12.2%'
            chipColor='info'
            avatarColor='error'
            title='مبلغ کل تراکنش‌ها'
            subtitle='هفتگی'
            avatarIcon='tabler:currency-dollar'
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <CardStatsVertical
            stats='24.67k'
            chipText='+25.2%'
            avatarColor='info'
            chipColor='default'
            title='تعداد تراکنش‌ها'
            subtitle='هفتگی'
            avatarIcon='tabler:chart-bar'
          />
        </Grid>
      </div>}


    </>

  );
}
