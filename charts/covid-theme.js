var covid_theme = function() {
    return {
        canvas: {
            fontColor: 'black',
            fontFamily: 'Avenir, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
            fontSize: 16,
            title: {
                fontSize: 16
            },
            subtitle: {
                show: false
            },
            shadow: {
                show: false
            },
            border: {
                show: false
            }
        },
        credits: {
            enabled: false,
            hAlign: 'right',
            text: null,
            href: 'ht' + 'tps://zoho.com',
            imageUrl: 'images/credit.png',
            imageWidth: 64,
            imageHeight: 12
        },
        tooltip: {
            useChartEffect: false,
            fontSize: 16,
            backgroundColor: 'white',
            fontColor: '#111111',
            borderWidth: 0,
            opacity: 1,
            padding: 10,
            borderRadius: 0,
            maxWidth: '80%',
            shadow: '0 0 3px 3px rgba(0,0,0,0.2)'
        },
        legend: {
            useChartEffect: false,
            layout: 'horizontal',
            hAlign: 'center',
            vAlign: 'bottom',
            marginBottom: 0,
            marginTop: 0
        },
        chart: {
            axes: {
                xaxis: {
                    ticklabel: {
                        fontSize: 12
                    }
                }
            }
        }
    };
};

$ZC.setTheme('covid_theme', covid_theme);
