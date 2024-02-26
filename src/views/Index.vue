<template>
    <div class="container">
        <h1 class="title">Inside Open Art</h1>
        <div class="parent">
            <div class="child">
                <v-img src="../assets/icon/Prison.png" height="30" width="30" class="child-icon" />
                <span>4pt grid system</span>
                <p>Base on 4pt grid system. Our UI kit help you create
                    perfect white space</p>
            </div>
            <div class="child">
                <v-img src="../assets/icon/Color Dropper.png" height="30" width="30" class="child-icon" />
                <span>Color style</span>
                <p>
                    All color in OpenArt are styled. You can change all
                    design color with one click
                </p>
            </div>
            <div class="child">
                <v-img src="../assets/icon/Vector.png" height="30" width="30" class="child-icon" />
                <span>Free font</span>
                <p>
                    OpenArt use Epilogue font family
                    Available with open licence in gooogle fontspace
                </p>
            </div>
            <div class="child">
                <v-img src="../assets/icon/Toggle On.png" height="30" width="30" class="child-icon" />
                <span>Darkmode avaiable</span>
                <p>
                    Our UI Kit support dark
                    mode Chage your design to dark mode with one click
                </p>
            </div>
            <div class="child">
                <v-img src="../assets/icon/Design.png" height="30" width="30" class="child-icon" />
                <span>Easy to customize</span>
                <p>
                    Create any design with OpenArt UI kits
                </p>
            </div>
            <div class="child">
                <v-img src="../assets/icon/Four Squares.png" height="30" width="30" class="child-icon" />
                <span>Variant components</span>
                <p>
                    All component art variant, easy to design,
                    easy to control
                </p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>

</script>
  
<style scoped>
* {
    font-family: 'Epilogue', sans-serif;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('@/assets/Image.png');
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
}

.title {
    margin-top: 116.56px;
    margin-bottom: 3%;
    font-size: 4rem;
    text-align: center;
}

.parent {
    display: flex;
    justify-content: center;
    align-content: stretch;
    flex-wrap: wrap;
}

.child {

    max-width: 493px;
    margin: 0.8%;
    /* max-height: 197.87px; */
    max-height: 170px;
    background-color: #FFFFFF;
    border-radius: 16px;
}

.child p:last-child {
    opacity: 0.8;
}

.child-icon {
    font-size: 24.03px;
    margin: 30px 0 20px 30px;
}

span {
    margin: 0px 0px 10px 30px;
    font-weight: 400;
    font-size: 24px;
    line-height: 24.6px;
}

p {
    width: 396px;
    font-size: 16px;
    margin: 10px 0px 20px 30px;
    font-weight: 400;
    line-height: 21px;
}
</style>