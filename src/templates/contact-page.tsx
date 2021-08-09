import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Link } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import addToMailchimp from 'gatsby-plugin-mailchimp'

const useStyles = makeStyles((theme) => ({
  container:{
    marginTop:50, 
    display: "flex", 
    flexDirection: "column",  
    height:"100vh", 
    marginRight:50,
    alignItems:"flex-end"
  },
  textContainer:{
    fontFamily:"Josefin Sans", 
    background: "linear-gradient(90deg, rgba(250,248,245,1) 2%, rgba(251,250,249,1) 44%, rgba(142,142,143,1) 100%)",
     padding:60,
     borderRadius:10,
  },
  websiteLink:{
    display:"block", 
    coursor:"pointer", 
    marginBottom:10,
  },
  submitButton:{
    padding:5,
    marginLeft:5,
    fontFamily: "Josefin Sans",
    backgroundColor: "green,"
  },
  instagramLink :{
    coursor:"pointer",
    display:"block",
    color:"black",
    marginTop: 5
  }
}))

export const ContactPageTemplate = ({title, name, address,email, website, instagram, input, button, confirmation, errorMessage}) => {
  const [userEmail, setUserEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  console.log("insta", instagram)
 const classes = useStyles();
  const handleChange = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value)
  }
  let handleOnChange = ( userEmail) => {
    
    // don't remember from where i copied this code, but this works.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( re.test(userEmail) ) {
        // this is a valid email address
       addToMailchimp(userEmail)
     setEmailError(`${confirmation}`)
    }
    else {
        // invalid email, maybe show an error to the user.
      setEmailError(`${errorMessage}`)
    }

  }
   let handleSubmit = async (e) => {
     e.preventDefault();
     const check = await handleOnChange(userEmail)
    const result = await addToMailchimp(userEmail)
    // I recommend setting `result` to React state
    // but you can do whatever you want
  }

  return (
    <section >
          <div className={classes.container} >
            <div style={{alignItems:"center", textAlign:"right"}}>
        
              <div className={classes.textContainer}>
              <h3>{name}</h3>
              <p> {address}</p>
              <a className={classes.websiteLink} href="https://www.franziskaharnisch.de/">{website}</a>
          <a  style={{coursor:"pointer"}}  href="mailto:lauratronchin@hotmail.it?body=My custom mail body">{email}</a>
          {instagram.map(link=>{
            return  <a className={classes.instagramLink} href={link.link}>{link.text}</a>
          })}
     
           <form> 
              <p>{emailError}</p>
              <input style={{width:300, height:30, paddingLeft:5}} type="email" id="email" name="email" value={userEmail} onChange={handleChange} placeholder={input} />
              <button  onClick={handleSubmit} className={classes.submitButton} >{button}</button>
                  </form>
                  </div>
              </div>
              </div>
    </section>
  )
}
ContactPageTemplate.propTypes = {
  title: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
   instagram: PropTypes.shape({
     text: PropTypes.string,
     link: PropTypes.string,}),
     input: PropTypes.string,
     button: PropTypes.string,
     confirmation: PropTypes.string,
     errorMessage: PropTypes.string,
}

const ContactPage = ({ data }) => {

  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ContactPageTemplate
        title={frontmatter.title}
       name={frontmatter.name}
    address={frontmatter.address}
    email={frontmatter.email}
     website={frontmatter.website}
       instagram={frontmatter.instagram}
       button={frontmatter.button}
       input={frontmatter.input}
       confirmation={frontmatter.confirmation}
       errorMessage={frontmatter.errorMessage}
      
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const contactPageQuery = graphql`
      query ContactPageTemplate ($id: String!) {
        markdownRemark(id: { eq: $id }) {
        frontmatter {
        title
        name
        address
        email
        website
        instagram{
          text
          link
        }
        input
        button
        confirmation
        errorMessage
       
      }
    }
  }
      `
