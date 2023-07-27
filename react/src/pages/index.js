import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import data from '../../../ai_project/output.json';
import { ChatBot } from 'src/components/chatbot';
import reviews from '../../../react/Reviews.json';


const now = new Date();

const Page = () => {
  console.log(' Page rendering');
  return(
    <>
    <Head>
      <title>
        Overview | Sentiment Analysis
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          fluid style={{ paddingLeft: 110}}
          container
          spacing={3}
        >
             <Grid
            xs={12}
            lg={7}
          >
            <OverviewTraffic
              chartSeries={[parseInt(data.spositive), parseInt(data.positive), parseInt(data.wpositive), 
                parseInt(data.snegative), parseInt(data.negative), parseInt(data.wnegative), parseInt(data.neutral)]
              }
              labels={['Strongly Positive', 'Positive', 'Weakly Positive', 'Strongly Negative', 'Negative', 'Weakly Negative', 'Neutral']}
              sx={{ height: '100%', width: '170%' }}
            />
          </Grid>

          <Grid
            xs={12}
            lg={7}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'Strongly Positive',
                  data: [parseInt(reviews["18-Jan-2023"].spositive),parseInt(reviews["22-Jan-2023"].spositive),parseInt(reviews["26-Jan-2023"].spositive), 
                         parseInt(reviews["30-Jan-2023"].spositive), parseInt(reviews["3-Feb-2023"].spositive), parseInt(reviews["7-Feb-2023"].spositive), 
                         parseInt(reviews["11-Feb-2023"].spositive),0,0,0]
                },
                {
                  name: 'Positive',
                  data: [parseInt(reviews["18-Jan-2023"].positive),parseInt(reviews["22-Jan-2023"].positive),parseInt(reviews["26-Jan-2023"].positive), 
                         parseInt(reviews["30-Jan-2023"].positive), parseInt(reviews["3-Feb-2023"].positive), parseInt(reviews["7-Feb-2023"].positive), 
                         parseInt(reviews["11-Feb-2023"].positive)]
                },
                {
                  name: 'Weakly Positive',
                  data: [parseInt(reviews["18-Jan-2023"].wpositive),parseInt(reviews["22-Jan-2023"].wpositive),parseInt(reviews["26-Jan-2023"].wpositive), 
                         parseInt(reviews["30-Jan-2023"].wpositive), parseInt(reviews["3-Feb-2023"].wpositive), parseInt(reviews["7-Feb-2023"].wpositive), 
                         parseInt(reviews["11-Feb-2023"].wpositive)]
                },

                {
                  name: 'Strongly Negative',
                  data: [parseInt(reviews["18-Jan-2023"].snegative),parseInt(reviews["22-Jan-2023"].snegative),parseInt(reviews["26-Jan-2023"].snegative), 
                         parseInt(reviews["30-Jan-2023"].snegative), parseInt(reviews["3-Feb-2023"].snegative), parseInt(reviews["7-Feb-2023"].snegative), 
                         parseInt(reviews["11-Feb-2023"].snegative)]
                },
                {
                  name: 'Negative',
                  data: [parseInt(reviews["18-Jan-2023"].negative),parseInt(reviews["22-Jan-2023"].negative),parseInt(reviews["26-Jan-2023"].negative), 
                         parseInt(reviews["30-Jan-2023"].negative), parseInt(reviews["3-Feb-2023"].negative), parseInt(reviews["7-Feb-2023"].negative), 
                         parseInt(reviews["11-Feb-2023"].negative)]
                },
                {
                  name: 'Weakly Negative',
                  data: [parseInt(reviews["18-Jan-2023"].wnegative),parseInt(reviews["22-Jan-2023"].wnegative),parseInt(reviews["26-Jan-2023"].wnegative), 
                        parseInt(reviews["30-Jan-2023"].wnegative), parseInt(reviews["3-Feb-2023"].wnegative), parseInt(reviews["7-Feb-2023"].wnegative), 
                        parseInt(reviews["11-Feb-2023"].wnegative)]
                },
                {
                  name: 'Neutral',
                  data: [parseInt(reviews["18-Jan-2023"].neutral),parseInt(reviews["22-Jan-2023"].neutral),parseInt(reviews["26-Jan-2023"].neutral), 
                        parseInt(reviews["30-Jan-2023"].neutral), parseInt(reviews["3-Feb-2023"].neutral), parseInt(reviews["7-Feb-2023"].neutral), 
                        parseInt(reviews["11-Feb-2023"].neutral)]
                }
              ]}
              sx={{ height: '100%',width: '170%' }}
            />
          </Grid>
          <Grid
            xs={12}
            lg={7}
          >
            <ChatBot input="Hey" sx={{ height: '100%', width: '170%' }}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
 
};

Page.getLayout = (page) => {
  console.log('inside getlayout')
  return (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)};

export default Page;
