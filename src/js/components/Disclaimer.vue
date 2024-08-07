<script setup>
    const emit = defineEmits([
        'close-overlay',
    ]);
</script>


<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Disclaimer</p>
                <button class="delete" aria-label="close" @click="$emit('close-overlay')"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <h1>Disclaimer for ridger.io</h1>
                    If you require any more information or have any questions about our site's
                    disclaimer, please feel free to contact us by email at ridger@fxstr.com.

                    <h2>Purpose and Source</h2>
                    ridger.io gives you easy access to the Tearsheet open source project (see
                    <a href="https://github.com/fxstr/tearsheet">GitHub</a>) to interactively
                    visualize portfolio information.

                    <h2>Data</h2>
                    None of the portfolio data you provide to this website leaves your device.
                    All data is processed strictly in your browser and is not sent to or stored on
                    a server. The data is only used to generate the visualizations you see on
                    the website.

                    <h2>Disclaimers for riger.io</h2>
                    All the information on this website is published in good faith and for general
                    information purpose only. ridger.io does not make any warranties about the
                    completeness, reliability and accuracy of this information. Any action you
                    take upon the information you find on ridger.io, is strictly at your own risk.
                    ridger.io will not be liable for any losses and/or damages in connection with
                    the use of ridger.io.

                    From our website, you can visit other websites by following hyperlinks to such
                    external sites. While we strive to provide only quality links to useful and
                    ethical websites, we have no control over the content and nature of these
                    sites. These links to other websites do not imply a recommendation for all
                    the content found on these sites. Site owners and content may change without
                    notice and may occur before we have the opportunity to remove a link which
                    may have gone 'bad'.

                    Please be also aware that when you leave our website, other sites may have
                    different privacy policies and terms which are beyond our control. Please be
                    sure to check the Privacy Policies of these sites as well as their "Terms of
                    Service" before engaging in any business or uploading any
                    information.

                    <h2>Consent</h2>
                    By using our website, you hereby consent to our disclaimer and agree to
                    its terms.
                </div>
            </section>
        </div>
    </div>
</template>
