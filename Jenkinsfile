pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'hello-cicd'
        CONTAINER_NAME = 'hello-cicd-test'
        APP_PORT       = '3000'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Compilando el código fuente...'
                sh 'node --version'
                sh 'npm run build'
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Ejecutando pruebas unitarias...'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando en el entorno de prueba...'
                sh '''
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }
    }

    post {
        success { echo "Pipeline OK: http://localhost:${APP_PORT}" }
        failure { echo 'Pipeline falló, revisa el log de la etapa.' }
    }
}
