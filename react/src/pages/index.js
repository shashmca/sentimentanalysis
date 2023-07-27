import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import data from '../../../ai_project/output.json';
import { ChatBot } from 'src/components/chatbot';

const now = new Date();

const Page = () => {
  return(
    <>
    <Head>
      <title>
        Overview | Devias Kit
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
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="50k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="12.6k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'Positive',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17]
                },
                {
                  name: 'Negative',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11]
                },
                {
                  name: 'Neutral',
                  data: [8, 7, 1, 3, 0, 5, 4, 3, 1]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[parseFloat(data.spositive), parseFloat(data.positive), parseFloat(data.wpositive), 
                parseFloat(data.snegative), parseFloat(data.negative), parseFloat(data.wnegative), parseFloat(data.neutral)]}
              labels={['Strongly Positive', 'Positive', 'Weakly Positive', 'Strongly Negative', 'Negative', 'Weakly Negative', 'Neutral']}
              sx={{ height: '100%', width: '200%' }}
            />
          </Grid>
        </Grid>
      </Container>
      {<ChatBot />}
    </Box>
  </>
  )
 
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
