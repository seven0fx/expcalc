const FilmType = {'Se-75':{'D2':9.0,'D3':4.1,'D4':2.4,'D5':1.4,'D7':1,'D8':0.5},
                'Ir-192':{'D2':10.3,'D3':4.6,'D4':2.5,'D5':1.6,'D7':1,'D8':0.5},
                'Co-60':{'D2':10.3,'D3':4.5,'D4':2.6,'D5':1.6,'D7':1,'D8':0.5}
                }

const SteelThickness = {'Se-75':{'slopeA':0.066633521974941,'interceptB':4.54766191288459},
                    'Ir-192':{'slopeA':0.0474661175395715,'interceptB':3.96061656113775},
                    'Co-60':{'slopeA':0.0313659796908272,'interceptB':4.37613272685848}
                    }

const TargetDensity = {
                'Co-60':{
                    'D2':{'a':0,'b':0.446593406593407,'c':0.0938461538461539},
                    'D3':{'a':0,'b':0.446593406593407,'c':0.0938461538461539},
                    'D4':{'a':0,'b':0.647386759581882,'c':-0.270731707317073},
                    'D5':{'a':0,'b':0.663333333333333,'c':-0.3075},
                    'D7':{'a':0,'b':0.714285714285714,'c':-0.390625},
                    'D8':{'a':0,'b':0.714285714285714,'c':-0.390625}
                        },
                'Ir-192':{
                    'D2':{'a':0,'b':0.43420523138833,'c':0.111267605633803},
                    'D3':{'a':0,'b':0.43420523138833,'c':0.111267605633803},
                    'D4':{'a':0,'b':0.665714285714286,'c':-0.306111111111111},
                    'D5':{'a':0,'b':0.671666666666667,'c':-0.315833333333334},
                    'D7':{'a':0,'b':0.7266409266409271,'c':-0.402702702702703},
                    'D8':{'a':0,'b':0.7266409266409271,'c':-0.402702702702703}
                        },
                'Se-75':{
                    'D2':{'a':0,'b':0.43420523138833,'c':0.111267605633803},
                    'D3':{'a':0,'b':0.43420523138833,'c':0.111267605633803},
                    'D4':{'a':0,'b':0.665714285714286,'c':-0.306111111111111},
                    'D5':{'a':0,'b':0.671666666666667,'c':-0.315833333333334},
                    'D7':{'a':0,'b':0.7266409266409271,'c':-0.402702702702703},
                    'D8':{'a':0,'b':0.7266409266409271,'c':-0.402702702702703}
                        }
                    }

// console.log(SteelThickness['Se-75'].slopeA + " " + SteelThickness['Se-75'].interceptB)

function calcIso(mSourceType, mActivity, mSteelThickness, mFilmType, mSourceToDetector, mDensity)
    {
        dicke = mSteelThickness;
        slope = SteelThickness[mSourceType].slopeA;
        intercept = SteelThickness[mSourceType].interceptB;
        erg = Math.exp((slope * dicke + intercept)) * 2;
        // console.log('F thickness: '+erg);
        erg = FilmType[mSourceType][mFilmType] * erg;
        // console.log('Film value: '+erg);
        b = TargetDensity[mSourceType][mFilmType]['b'];
        c = TargetDensity[mSourceType][mFilmType]['c'];
        erg2 = mDensity * b + c;
        // console.log('Relative exposure RE: '+erg2);
        erg = erg2 * erg;
        // console.log('Target density: '+erg);
        erg = mSourceToDetector**2 / 1_000_000 * erg;
        // console.log('SDD: '+erg);
        erg = erg / mActivity;
        // console.log('Time: '+erg);
        // console.log('Time in seconds: '+erg*60);
        var date = new Date(null);
        date.setSeconds(erg*60);
        var result = date.toISOString().substr(11, 8);
        // console.log(result);
        return result;
    }


