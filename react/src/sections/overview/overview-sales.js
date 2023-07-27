import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import data from '../../../../ai_project/output1.json';

const useChartOptions = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2a9461"
      },
      secondary: {
        main: "#494c7d"
      },
      companyRed: {
         main: '#E44D69',
      },
      companyBlue: {
        main: '#2A9DF4',
     },
     companyYellow: {
      main: '#FFDB58',
    },
   companyOrange: {
    main: '#FFA500',
    },
    companySky: {
      main: '#87CEEB',
      },
      accent: {
        main: purple[100] // Or purple[100], purple[200]
      }
    }
  });
  

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.accent.main,
      theme.palette.secondary.main,
      theme.palette.companyRed.main,
      theme.palette.companyOrange.main,
      theme.palette.companyYellow.main,
      theme.palette.companySky.main
    ],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: Object.keys(data),
      // categories: [
      //   '18 Jan',
      //   '22 Jan',
      //   '26 Jan',
      //   '30 Jan',
      //   '3 Feb',
      //   '7 Feb',
      //   '11 Feb'
      // ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewSales = (props) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader
        title="Sentiment Timeline"
      />
      <CardContent>
        <Chart
          height={450}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="130%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
      </CardActions>
    </Card>
  );
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
