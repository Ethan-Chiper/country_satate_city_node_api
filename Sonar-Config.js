/* eslint-disable no-undef */
const SonarQubeScanner = require('sonarqube-scanner');

SonarQubeScanner(
    {
        serverUrl: 'http://192.168.0.108:9000',
        options: {
            'sonar.projectDescription': 'This is a Node JS application',
            'sonar.projectName': 'country_satate_city',
            'sonar.projectKey': 'country_satate_city',
            'sonar.login': 'sqp_4603a83ce8cd3a8784ef05d52657a66ddc76c140',
            'sonar.projectVersion': '1.0',
            'sonar.language': 'js',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.sources': '.',
            //'sonar.tests': 'specs',
            //'sonar.inclusions' : 'src/**'
            'sonar.java.binaries': '**/*.java'
        }
    },
    () => { }
);