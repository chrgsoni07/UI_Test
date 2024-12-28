import { auth } from "@/auth";
import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {!session?.user ? (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" gutterBottom>
              Welcome to Smart Resume GEN
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Generate a high-quality, ATS-friendly resume with the help of AI.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                alt="AI Resume"
                height="300"
                image="../img/ai_resume.png"
                title="AI Resume"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  AI-Powered Resume Creation
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Leverage the power of AI to create a resume that stands out.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                alt="ATS Friendly"
                height="300"
                image="../img/ats_friendly.png"
                title="ATS Friendly"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  ATS-Friendly Templates
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ensure your resume gets past the Applicant Tracking Systems.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Link href="/signin" passHref>
              <Button variant="contained" color="primary" size="large">
                Sign In to Get Started
              </Button>
            </Link>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome back!
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Upload your existing resume and let our AI help you enhance it.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Upload Resume"
                image="../img/cv.png"
                title="Upload Resume"
                style={{
                  width: "50%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block", // Remove inline behavior and allow centering
                  marginLeft: "auto", // Center horizontally
                  marginRight: "auto",
                }}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Upload Your Resume
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start by uploading your existing resume.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="AI Enhancement"
                image="../img/content.png"
                style={{
                  width: "50%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block", // Remove inline behavior and allow centering
                  marginLeft: "auto", // Center horizontally
                  marginRight: "auto",
                }}
                title="AI Enhancement"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  AI Enhancement
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Our AI will help you enhance your resume to make it stand out.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Job Specific"
                style={{
                  width: "50%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block", // Remove inline behavior and allow centering
                  marginLeft: "auto", // Center horizontally
                  marginRight: "auto",
                }}
                image="../img/ai_target.png"
                title="Job Specific"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Tailor to Job Requirements
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Customize your resume for specific job applications.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Link href="/resume" passHref>
              <Button variant="contained" color="primary" size="large">
                Upload Resume
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
