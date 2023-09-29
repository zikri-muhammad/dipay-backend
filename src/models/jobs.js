import mongoose from "mongoose";
import slugify from "slugify";
import validator from "validator"

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Please enter title"],
    trim: true,
    maxlength : [100, 'job title canot exceed 100 characters']
  },
  slug: String,
  description: {
    type: String,
    require: [true, "Please enter description"],
    maxlength : [1000, 'job title canot exceed 1000 characters']
  },
  email: {
    type: String,
    validate: [validator.isEmail, "please add a valid email"]
  },
  address: {
    type: String, 
    require: [true, "please add an address"]
  },
  company: {
    type: String,
    require:[true, "please add company name"]
  },
  industry: {
    type: [String],
    require: true,
    enum: {
      values: [
        'Business',
        'Information Technology',
        'Banking',
        'Education/Training',
        'Telecomunication',
        'Others'
      ],
      message: 'Please select corect option for industry'
    }
  },
  jobType: {
    type: String,
    require: true,
    enum: {
      values: [
        'Permanent',
        'Temporary',
        'Internship'
      ],
      message: 'Please select corect option for job type'
    }
  },
  midEducation: {
    type: String,
    require: true,
    enum: {
      values: [
        'Bachelors',
        'Masters',
        'Phd'
      ],
      message: 'Please select corect option for education'
    }
  },
  positions: {
    type: Number,
    default: 1,
  },
  experince: {
    type: String,
    require: true,
    enum: {
      values: [
        'No experience',
        '1 Year - 2 Year',
        '2 Year - 3 Year',
        '3 Year - 4 Year',
        '5 years +'
      ],
      message: 'please select corect option for experience'
    }
  },
  salary: {
    type: Number,
    require: [true, "Please enter expectation salary for this job"]
  },
  postingDate: {
    type: Date,
    default: Date.now
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7)
  },
  applicantsApplied: {
    type: [Object],
    select: false
  }

})

jobSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})

export default mongoose.model('Job', jobSchema)