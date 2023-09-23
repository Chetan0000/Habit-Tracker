
const Habit = require("../models/habit");

module.exports.home = async (req, res ) => {
    return res.render('landing', {
        title:"Habit Tracker"
    })
}

module.exports.habit = async (req, res ) => {
// Habit.find().select('-updatedAt -createdAt -__v').sort({ _id: -1 })
    await Habit.find().sort({ _id: -1 })
    .then(habits => {
        var days = []
        days.push(getD(0));
        days.push(getD(1));
        days.push(getD(2));
        days.push(getD(3));
        days.push(getD(4));
        days.push(getD(5));
        days.push(getD(6));
        // console.log(habits,days);
        res.render('home', {title:'Habit', habits:habits, days });
    })
    .catch( err => {
        console.log(`Error in rendering data from Data Base ${err}`);
    });
};

//  function to find the date and return the String date
function getD(n){
    let d = new Date();
    d.setDate(d.getDate()+n);
    let newDate = d.toLocaleDateString('pt-br').split('/').reverse().join('-');
    let day;
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return {date:newDate, day};
}

module.exports.addHabit = async(req, res) => {
    
    // console.log(content); 


    await Habit.findOne({content:req.body.content})
    .then(habit => {
        // console.log(habit);
        if(habit){
            // console.log(habit._id);
            let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.push({date:localISOTime});
            habit.dates = dates
            return res.redirect('back');

            
        }else{

            let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.push({ date: localISOTime, complete:"none"});
            Habit.create({
                content:req.body.content,
                dates:dates
            })
            .then( habit => {
                return res.redirect('back');
            })
            .catch(err => {
                console.log(`Error in crating habit ${err}`);
                return res.redirect('back');
            })
        }
    })
    

    // return res.redirect('back');
}

module.exports.updateStatus = async(req, res) => {
    var d = req.query.date;
    var id = req.query.id;
    // console.log(d, id);
    await Habit.findById(id)
    .then( habit => {
        let dates = habit.dates;
        let found = false;
        
        // console.log(dates);
        dates.find((item, index) => {
            if(item.date === d){
                if(item.complete === "yes"){
                    item.complete = "no";
                    // dates.push({ date:d, complete:"no" })
                    console.log("yes check");
                    
                }else if(item.complete === "no"){
                    item.complete = "none";
                    // dates.push({ date:d, complete:"none" })
                    console.log("yse check");
                    
                }else if(item.complete === "none"){
                    item.complete = "yes";
                    console.log('none check');
                    // dates.push({ date:d, complete:"yes" })
                    
                }
                
                found = true;
            }
        })
        if (!found) {
            dates.push({ date: d, complete: 'yes' })
        }
        habit.dates = dates;
        return habit.save();
        

    })


    return res.redirect('back');
}

// function to delete habit from dataBase

module.exports.destroy = (req, res) => {
    let id = req.query.id;
    Habit.findByIdAndDelete(id)
    .then(habit => {
        console.log(`Habit deleted ${habit}`);
        return res.redirect('back');
    })
    .catch(error => {
        console.log('error in deleting habit from data base');
        return ;
    })
}